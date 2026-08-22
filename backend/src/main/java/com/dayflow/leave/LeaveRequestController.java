package com.dayflow.leave;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @PostMapping
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequest leaveRequest, Principal principal) {
        if (leaveRequest.getEmployeeId() == null && principal != null) {
            try {
                leaveRequest.setEmployeeId(Long.valueOf(principal.getName()));
            } catch (NumberFormatException ignored) {
            }
        }
        LeaveRequest created = leaveRequestService.applyLeave(leaveRequest);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<List<LeaveRequest>> getMyLeaves(@RequestParam(required = false) Long employeeId,
                                                          Principal principal) {
        Long targetEmployeeId = employeeId;
        if (targetEmployeeId == null && principal != null) {
            try {
                targetEmployeeId = Long.valueOf(principal.getName());
            } catch (NumberFormatException ignored) {
            }
        }
        List<LeaveRequest> leaves = leaveRequestService.getEmployeeLeaves(targetEmployeeId);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getLeaveById(@PathVariable Long id) {
        LeaveRequest leave = leaveRequestService.getLeaveById(id);
        return ResponseEntity.ok(leave);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaves(@RequestParam(required = false) LeaveStatus status) {
        List<LeaveRequest> leaves = leaveRequestService.getAllLeaves(status);
        return ResponseEntity.ok(leaves);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable Long id) {
        LeaveRequest approved = leaveRequestService.approveLeave(id);
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable Long id) {
        LeaveRequest rejected = leaveRequestService.rejectLeave(id);
        return ResponseEntity.ok(rejected);
    }
}
