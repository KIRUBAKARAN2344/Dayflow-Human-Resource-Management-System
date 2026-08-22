package com.dayflow.employee;

import com.dayflow.employee.dto.EmployeeCreateRequest;
import com.dayflow.employee.dto.EmployeeResponse;
import com.dayflow.employee.dto.EmployeeUpdateRequest;
import com.dayflow.user.User;
import com.dayflow.user.UserRepository;
import com.dayflow.user.Role;
import com.dayflow.exception.ForbiddenException;
import com.dayflow.exception.ResourceNotFoundException;
import com.dayflow.exception.ConflictException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final UserRepository userRepository;

    public EmployeeController(EmployeeService employeeService, UserRepository userRepository) {
        this.employeeService = employeeService;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    private void checkAdminAccess(User currentUser) {
        if (currentUser.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Access denied. Admin role required.");
        }
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@Valid @RequestBody EmployeeCreateRequest request) {
        User currentUser = getAuthenticatedUser();
        checkAdminAccess(currentUser);

        User targetUser = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        if (employeeService.findByUserId(targetUser.getId()).isPresent()) {
            throw new ConflictException("Employee profile already exists for this user");
        }

        Employee employee = new Employee();
        employee.setUser(targetUser);
        employee.setPhone(request.getPhone());
        employee.setAddress(request.getAddress());
        employee.setDepartment(request.getDepartment());
        employee.setJobTitle(request.getJobTitle());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setProfilePicture(request.getProfilePicture());

        Employee savedEmployee = employeeService.save(employee);
        return ResponseEntity.ok(convertToResponse(savedEmployee));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        User currentUser = getAuthenticatedUser();
        checkAdminAccess(currentUser);

        List<EmployeeResponse> employees = employeeService.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        User currentUser = getAuthenticatedUser();
        Employee employee = employeeService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        // Allow ADMIN, or the EMPLOYEE themselves
        if (currentUser.getRole() != Role.ADMIN) {
            if (!employee.getUser().getId().equals(currentUser.getId())) {
                throw new ForbiddenException("Access denied. You can only view your own profile.");
            }
        }

        return ResponseEntity.ok(convertToResponse(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeUpdateRequest request
    ) {
        User currentUser = getAuthenticatedUser();
        Employee employee = employeeService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        // Allow ADMIN, or the EMPLOYEE themselves (with restrictions)
        if (currentUser.getRole() != Role.ADMIN) {
            if (!employee.getUser().getId().equals(currentUser.getId())) {
                throw new ForbiddenException("Access denied. You can only update your own profile.");
            }
        }

        employee.setPhone(request.getPhone());
        employee.setAddress(request.getAddress());
        employee.setDepartment(request.getDepartment());
        employee.setJobTitle(request.getJobTitle());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setProfilePicture(request.getProfilePicture());

        Employee updatedEmployee = employeeService.save(employee);
        return ResponseEntity.ok(convertToResponse(updatedEmployee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        User currentUser = getAuthenticatedUser();
        checkAdminAccess(currentUser);

        Employee employee = employeeService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        // Disables the associated User account rather than physically deleting important HR data
        User targetUser = employee.getUser();
        targetUser.setEnabled(false);
        userRepository.save(targetUser);

        return ResponseEntity.noContent().build();
    }

    private EmployeeResponse convertToResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getUser().getId(),
                employee.getPhone(),
                employee.getAddress(),
                employee.getDepartment(),
                employee.getJobTitle(),
                employee.getJoiningDate(),
                employee.getProfilePicture()
        );
    }
}
