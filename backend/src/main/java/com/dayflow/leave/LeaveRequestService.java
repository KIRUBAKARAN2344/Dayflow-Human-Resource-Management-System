package com.dayflow.leave;

import com.dayflow.employee.EmployeeRepository;
import com.dayflow.exception.BadRequestException;
import com.dayflow.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, EmployeeRepository employeeRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public LeaveRequest applyLeave(LeaveRequest request) {
        if (request == null) {
            throw new BadRequestException("Leave request body is required");
        }
        if (request.getEmployeeId() == null) {
            throw new BadRequestException("Employee ID is required");
        }
        if (!employeeRepository.existsById(request.getEmployeeId())) {
            throw new ResourceNotFoundException("Employee not found with id: " + request.getEmployeeId());
        }
        if (request.getLeaveType() == null) {
            throw new BadRequestException("Leave type is required");
        }
        if (request.getStartDate() == null) {
            throw new BadRequestException("Start date is required");
        }
        if (request.getEndDate() == null) {
            throw new BadRequestException("End date is required");
        }
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("End date cannot be before start date");
        }

        // Default status MUST be PENDING
        request.setStatus(LeaveStatus.PENDING);

        return leaveRequestRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getEmployeeLeaves(Long employeeId) {
        if (employeeId == null) {
            throw new BadRequestException("Employee ID is required");
        }
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    @Transactional(readOnly = true)
    public LeaveRequest getLeaveById(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getAllLeaves(LeaveStatus status) {
        if (status != null) {
            return leaveRequestRepository.findByStatus(status);
        }
        return leaveRequestRepository.findAll();
    }

    @Transactional
    public LeaveRequest approveLeave(Long id) {
        LeaveRequest request = getLeaveById(id);
        if (request.getStatus() != LeaveStatus.PENDING) {
            throw new BadRequestException("Only PENDING leave requests can be approved. Current status: " + request.getStatus());
        }
        request.setStatus(LeaveStatus.APPROVED);
        return leaveRequestRepository.save(request);
    }

    @Transactional
    public LeaveRequest rejectLeave(Long id) {
        LeaveRequest request = getLeaveById(id);
        if (request.getStatus() != LeaveStatus.PENDING) {
            throw new BadRequestException("Only PENDING leave requests can be rejected. Current status: " + request.getStatus());
        }
        request.setStatus(LeaveStatus.REJECTED);
        return leaveRequestRepository.save(request);
    }
}
