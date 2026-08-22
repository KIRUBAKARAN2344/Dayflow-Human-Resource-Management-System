package com.dayflow.attendance;

import com.dayflow.employee.EmployeeRepository;
import com.dayflow.exception.BadRequestException;
import com.dayflow.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock
    private AttendanceRepository attendanceRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private AttendanceService attendanceService;

    private Long employeeId = 100L;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testSuccessfulCheckIn() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(attendanceRepository.findByEmployeeIdAndDate(eq(employeeId), any(LocalDate.class)))
                .thenReturn(Optional.empty());

        Attendance mockAttendance = new Attendance(1L, employeeId, LocalDate.now(), LocalTime.now(), null, AttendanceStatus.PRESENT);
        when(attendanceRepository.save(any(Attendance.class))).thenReturn(mockAttendance);

        Attendance result = attendanceService.checkIn(employeeId);

        assertNotNull(result);
        assertEquals(employeeId, result.getEmployeeId());
        assertEquals(AttendanceStatus.PRESENT, result.getStatus());
        verify(attendanceRepository, times(1)).save(any(Attendance.class));
    }

    @Test
    void testDuplicateCheckInRejected() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        Attendance existing = new Attendance(1L, employeeId, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceRepository.findByEmployeeIdAndDate(eq(employeeId), any(LocalDate.class)))
                .thenReturn(Optional.of(existing));

        assertThrows(BadRequestException.class, () -> attendanceService.checkIn(employeeId));
        verify(attendanceRepository, never()).save(any(Attendance.class));
    }

    @Test
    void testSuccessfulCheckOut() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        Attendance existing = new Attendance(1L, employeeId, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceRepository.findByEmployeeIdAndDate(eq(employeeId), any(LocalDate.class)))
                .thenReturn(Optional.of(existing));
        when(attendanceRepository.save(any(Attendance.class))).thenAnswer(i -> i.getArgument(0));

        Attendance result = attendanceService.checkOut(employeeId);

        assertNotNull(result);
        assertNotNull(result.getCheckOut());
        verify(attendanceRepository, times(1)).save(existing);
    }

    @Test
    void testCheckOutWithoutCheckInRejected() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(attendanceRepository.findByEmployeeIdAndDate(eq(employeeId), any(LocalDate.class)))
                .thenReturn(Optional.empty());

        assertThrows(BadRequestException.class, () -> attendanceService.checkOut(employeeId));
    }

    @Test
    void testDuplicateCheckOutRejected() {
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        Attendance existing = new Attendance(1L, employeeId, LocalDate.now(), LocalTime.of(9, 0), LocalTime.of(17, 0), AttendanceStatus.PRESENT);
        when(attendanceRepository.findByEmployeeIdAndDate(eq(employeeId), any(LocalDate.class)))
                .thenReturn(Optional.of(existing));

        assertThrows(BadRequestException.class, () -> attendanceService.checkOut(employeeId));
    }

    @Test
    void testGetEmployeeAttendance() {
        Attendance a1 = new Attendance(1L, employeeId, LocalDate.now().minusDays(1), LocalTime.of(9, 0), LocalTime.of(17, 0), AttendanceStatus.PRESENT);
        Attendance a2 = new Attendance(2L, employeeId, LocalDate.now(), LocalTime.of(9, 30), null, AttendanceStatus.PRESENT);

        when(attendanceRepository.findByEmployeeId(employeeId)).thenReturn(Arrays.asList(a1, a2));

        List<Attendance> result = attendanceService.getAttendanceForEmployee(employeeId);
        assertEquals(2, result.size());
    }

    @Test
    void testGetAttendanceByDate() {
        LocalDate date = LocalDate.now();
        Attendance a1 = new Attendance(1L, employeeId, date, LocalTime.of(9, 0), LocalTime.of(17, 0), AttendanceStatus.PRESENT);
        when(attendanceRepository.findByDate(date)).thenReturn(List.of(a1));

        List<Attendance> result = attendanceService.getAllAttendance(date);
        assertEquals(1, result.size());
    }

    @Test
    void testUpdateAttendance() {
        Attendance existing = new Attendance(1L, employeeId, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(attendanceRepository.save(any(Attendance.class))).thenAnswer(i -> i.getArgument(0));

        Attendance updateReq = new Attendance();
        updateReq.setStatus(AttendanceStatus.HALF_DAY);

        Attendance updated = attendanceService.updateAttendance(1L, updateReq);
        assertEquals(AttendanceStatus.HALF_DAY, updated.getStatus());
    }
}
