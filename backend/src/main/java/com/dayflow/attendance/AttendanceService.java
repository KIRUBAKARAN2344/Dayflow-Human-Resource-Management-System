package com.dayflow.attendance;

import com.dayflow.employee.EmployeeRepository;
import com.dayflow.exception.BadRequestException;
import com.dayflow.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Attendance checkIn(Long employeeId) {
        if (employeeId == null) {
            throw new BadRequestException("Employee ID is required for check-in");
        }
        if (!employeeRepository.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee not found with id: " + employeeId);
        }

        LocalDate today = LocalDate.now();
        Optional<Attendance> existing = attendanceRepository.findByEmployeeIdAndDate(employeeId, today);
        if (existing.isPresent()) {
            throw new BadRequestException("Attendance record already exists for today. Duplicate check-in rejected.");
        }

        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setDate(today);
        attendance.setCheckIn(LocalTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);

        return attendanceRepository.save(attendance);
    }

    @Transactional
    public Attendance checkOut(Long employeeId) {
        if (employeeId == null) {
            throw new BadRequestException("Employee ID is required for check-out");
        }
        if (!employeeRepository.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee not found with id: " + employeeId);
        }

        LocalDate today = LocalDate.now();
        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, today)
                .orElseThrow(() -> new BadRequestException("No check-in record found for today. Check-out rejected."));

        if (attendance.getCheckIn() == null) {
            throw new BadRequestException("Check-in time is missing. Check-out rejected.");
        }

        if (attendance.getCheckOut() != null) {
            throw new BadRequestException("Already checked out for today. Duplicate check-out rejected.");
        }

        attendance.setCheckOut(LocalTime.now());
        return attendanceRepository.save(attendance);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAttendanceForEmployee(Long employeeId) {
        if (employeeId == null) {
            throw new BadRequestException("Employee ID is required");
        }
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAllAttendance(LocalDate date) {
        if (date != null) {
            return attendanceRepository.findByDate(date);
        }
        return attendanceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + id));
    }

    @Transactional
    public Attendance updateAttendance(Long id, Attendance updateDetails) {
        Attendance attendance = getAttendanceById(id);

        if (updateDetails.getStatus() != null) {
            attendance.setStatus(updateDetails.getStatus());
        }
        if (updateDetails.getCheckIn() != null) {
            attendance.setCheckIn(updateDetails.getCheckIn());
        }
        if (updateDetails.getCheckOut() != null) {
            attendance.setCheckOut(updateDetails.getCheckOut());
        }
        if (updateDetails.getDate() != null) {
            attendance.setDate(updateDetails.getDate());
        }

        return attendanceRepository.save(attendance);
    }
}
