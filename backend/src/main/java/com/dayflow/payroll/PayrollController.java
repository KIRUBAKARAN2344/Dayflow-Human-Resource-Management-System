package com.dayflow.payroll;

import com.dayflow.payroll.dto.PayrollResponse;
import com.dayflow.payroll.dto.PayrollUpdateRequest;
import com.dayflow.user.User;
import com.dayflow.user.UserRepository;
import com.dayflow.user.Role;
import com.dayflow.employee.Employee;
import com.dayflow.employee.EmployeeRepository;
import com.dayflow.exception.ForbiddenException;
import com.dayflow.exception.ResourceNotFoundException;
import com.dayflow.exception.BadRequestException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    private final PayrollService payrollService;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;

    public PayrollController(
            PayrollService payrollService,
            UserRepository userRepository,
            EmployeeRepository employeeRepository
    ) {
        this.payrollService = payrollService;
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<PayrollResponse> getPayrollByEmployeeId(@PathVariable Long employeeId) {
        User currentUser = getAuthenticatedUser();
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        // Allow ADMIN, or the EMPLOYEE themselves
        if (currentUser.getRole() != Role.ADMIN) {
            if (!employee.getUser().getId().equals(currentUser.getId())) {
                throw new ForbiddenException("Access denied. You can only view your own payroll.");
            }
        }

        Payroll payroll = payrollService.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll record not found for employee ID: " + employeeId));

        return ResponseEntity.ok(convertToResponse(payroll));
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<PayrollResponse> updatePayroll(
            @PathVariable Long employeeId,
            @Valid @RequestBody PayrollUpdateRequest request
    ) {
        User currentUser = getAuthenticatedUser();
        if (currentUser.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Access denied. Admin role required.");
        }

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        BigDecimal basic = request.getBasicSalary();
        BigDecimal allowances = request.getAllowances();
        BigDecimal deductions = request.getDeductions();

        if (basic == null || allowances == null || deductions == null) {
            throw new BadRequestException("All salary components (basicSalary, allowances, deductions) must be provided");
        }

        if (basic.compareTo(BigDecimal.ZERO) < 0 ||
            allowances.compareTo(BigDecimal.ZERO) < 0 ||
            deductions.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Salary components cannot be negative");
        }

        BigDecimal netSalary = basic.add(allowances).subtract(deductions);
        if (netSalary.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Net salary cannot be negative");
        }

        Payroll payroll = payrollService.findByEmployeeId(employeeId)
                .orElse(new Payroll());

        payroll.setEmployee(employee);
        payroll.setBasicSalary(basic);
        payroll.setAllowances(allowances);
        payroll.setDeductions(deductions);
        payroll.setNetSalary(netSalary);

        Payroll savedPayroll = payrollService.save(payroll);
        return ResponseEntity.ok(convertToResponse(savedPayroll));
    }

    private PayrollResponse convertToResponse(Payroll payroll) {
        return new PayrollResponse(
                payroll.getId(),
                payroll.getEmployee().getId(),
                payroll.getBasicSalary(),
                payroll.getAllowances(),
                payroll.getDeductions(),
                payroll.getNetSalary(),
                payroll.getUpdatedAt()
        );
    }
}
