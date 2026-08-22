package com.dayflow.leave;

import com.dayflow.employee.EmployeeRepository;
import com.dayflow.exception.BadRequestException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeaveRequestServiceTest {

    @Mock
    private LeaveRequestRepository leaveRequestRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private LeaveRequestService leaveRequestService;

    private Long employeeId = 100L;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testSuccessfulLeaveApplication() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        LeaveRequest req = new LeaveRequest(null, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(2), "Vacation", null);
        LeaveRequest saved = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(2), "Vacation", LeaveStatus.PENDING);

        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenReturn(saved);

        LeaveRequest result = leaveRequestService.applyLeave(req);

        assertNotNull(result);
        assertEquals(LeaveStatus.PENDING, result.getStatus());
        verify(leaveRequestRepository, times(1)).save(any(LeaveRequest.class));
    }

    @Test
    void testDefaultStatusIsPending() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        LeaveRequest req = new LeaveRequest(null, employeeId, LeaveType.SICK, LocalDate.now(), LocalDate.now().plusDays(1), "Sick", LeaveStatus.APPROVED);
        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenAnswer(i -> i.getArgument(0));

        LeaveRequest result = leaveRequestService.applyLeave(req);

        assertEquals(LeaveStatus.PENDING, result.getStatus());
    }

    @Test
    void testInvalidDateRangeRejected() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        LeaveRequest req = new LeaveRequest(null, employeeId, LeaveType.PAID, LocalDate.now().plusDays(5), LocalDate.now(), "Invalid", null);

        assertThrows(BadRequestException.class, () -> leaveRequestService.applyLeave(req));
        verify(leaveRequestRepository, never()).save(any(LeaveRequest.class));
    }

    @Test
    void testGetEmployeeLeaves() {
        LeaveRequest r1 = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.PENDING);
        when(leaveRequestRepository.findByEmployeeId(employeeId)).thenReturn(List.of(r1));

        List<LeaveRequest> result = leaveRequestService.getEmployeeLeaves(employeeId);
        assertEquals(1, result.size());
    }

    @Test
    void testGetPendingLeaves() {
        LeaveRequest r1 = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.PENDING);
        when(leaveRequestRepository.findByStatus(LeaveStatus.PENDING)).thenReturn(List.of(r1));

        List<LeaveRequest> result = leaveRequestService.getAllLeaves(LeaveStatus.PENDING);
        assertEquals(1, result.size());
        assertEquals(LeaveStatus.PENDING, result.get(0).getStatus());
    }

    @Test
    void testApprovePendingLeave() {
        LeaveRequest pending = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.PENDING);
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(pending));
        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenAnswer(i -> i.getArgument(0));

        LeaveRequest result = leaveRequestService.approveLeave(1L);

        assertEquals(LeaveStatus.APPROVED, result.getStatus());
    }

    @Test
    void testRejectPendingLeave() {
        LeaveRequest pending = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.PENDING);
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(pending));
        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenAnswer(i -> i.getArgument(0));

        LeaveRequest result = leaveRequestService.rejectLeave(1L);

        assertEquals(LeaveStatus.REJECTED, result.getStatus());
    }

    @Test
    void testApprovingAlreadyApprovedOrRejectedLeaveRejected() {
        LeaveRequest approved = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.APPROVED);
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(approved));

        assertThrows(BadRequestException.class, () -> leaveRequestService.approveLeave(1L));

        LeaveRequest rejected = new LeaveRequest(2L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.REJECTED);
        when(leaveRequestRepository.findById(2L)).thenReturn(Optional.of(rejected));

        assertThrows(BadRequestException.class, () -> leaveRequestService.approveLeave(2L));
    }

    @Test
    void testRejectingAlreadyApprovedOrRejectedLeaveRejected() {
        LeaveRequest approved = new LeaveRequest(1L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.APPROVED);
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(approved));

        assertThrows(BadRequestException.class, () -> leaveRequestService.rejectLeave(1L));

        LeaveRequest rejected = new LeaveRequest(2L, employeeId, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Rest", LeaveStatus.REJECTED);
        when(leaveRequestRepository.findById(2L)).thenReturn(Optional.of(rejected));

        assertThrows(BadRequestException.class, () -> leaveRequestService.rejectLeave(2L));
    }
}
