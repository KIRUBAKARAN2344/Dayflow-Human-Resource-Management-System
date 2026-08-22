package com.dayflow.attendance;

import org.springframework.format.annotation.DateTimeFormat;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/check-in")
    public ResponseEntity<Attendance> checkIn(@RequestBody(required = false) Map<String, Object> body,
                                              @RequestParam(required = false) Long employeeId,
                                              Principal principal) {
        Long targetEmployeeId = resolveEmployeeId(body, employeeId, principal);
        Attendance attendance = attendanceService.checkIn(targetEmployeeId);
        return new ResponseEntity<>(attendance, HttpStatus.CREATED);
    }

    @PostMapping("/check-out")
    public ResponseEntity<Attendance> checkOut(@RequestBody(required = false) Map<String, Object> body,
                                               @RequestParam(required = false) Long employeeId,
                                               Principal principal) {
        Long targetEmployeeId = resolveEmployeeId(body, employeeId, principal);
        Attendance attendance = attendanceService.checkOut(targetEmployeeId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Attendance>> getMyAttendance(@RequestParam(required = false) Long employeeId,
                                                             Principal principal) {
        Long targetEmployeeId = resolveEmployeeId(null, employeeId, principal);
        List<Attendance> attendances = attendanceService.getAttendanceForEmployee(targetEmployeeId);
        return ResponseEntity.ok(attendances);
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Attendance> attendances = attendanceService.getAllAttendance(date);
        return ResponseEntity.ok(attendances);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getEmployeeAttendance(@PathVariable Long employeeId) {
        List<Attendance> attendances = attendanceService.getAttendanceForEmployee(employeeId);
        return ResponseEntity.ok(attendances);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id,
                                                        @RequestBody Attendance attendance) {
        Attendance updated = attendanceService.updateAttendance(id, attendance);
        return ResponseEntity.ok(updated);
    }

    private Long resolveEmployeeId(Map<String, Object> body, Long paramId, Principal principal) {
        if (paramId != null) {
            return paramId;
        }
        if (body != null && body.containsKey("employeeId") && body.get("employeeId") != null) {
            return Long.valueOf(body.get("employeeId").toString());
        }
        if (principal != null) {
            try {
                return Long.valueOf(principal.getName());
            } catch (NumberFormatException ignored) {
            }
        }
        return null;
    }
}
