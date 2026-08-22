package com.dayflow.attendance;

import com.dayflow.DayflowApplication;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ContextConfiguration;
import com.dayflow.security.JwtService;
import com.dayflow.security.CustomUserDetailsService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AttendanceController.class)
@AutoConfigureMockMvc(addFilters = false)
class AttendanceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AttendanceService attendanceService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCheckInEndpoint() throws Exception {
        Attendance attendance = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceService.checkIn(100L)).thenReturn(attendance);

        mockMvc.perform(post("/api/attendance/check-in")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("employeeId", 100L))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.employeeId").value(100L))
                .andExpect(jsonPath("$.status").value("PRESENT"));
    }

    @Test
    void testCheckOutEndpoint() throws Exception {
        Attendance attendance = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), LocalTime.of(17, 0), AttendanceStatus.PRESENT);
        when(attendanceService.checkOut(100L)).thenReturn(attendance);

        mockMvc.perform(post("/api/attendance/check-out")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("employeeId", 100L))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeId").value(100L));
    }

    @Test
    void testGetMyAttendanceEndpoint() throws Exception {
        Attendance attendance = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceService.getAttendanceForEmployee(100L)).thenReturn(List.of(attendance));

        mockMvc.perform(get("/api/attendance/me")
                        .param("employeeId", "100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeId").value(100L));
    }

    @Test
    void testGetAllAttendanceEndpoint() throws Exception {
        Attendance attendance = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceService.getAllAttendance(any())).thenReturn(List.of(attendance));

        mockMvc.perform(get("/api/attendance"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }

    @Test
    void testGetEmployeeAttendanceEndpoint() throws Exception {
        Attendance attendance = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), null, AttendanceStatus.PRESENT);
        when(attendanceService.getAttendanceForEmployee(100L)).thenReturn(List.of(attendance));

        mockMvc.perform(get("/api/attendance/employee/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeId").value(100L));
    }

    @Test
    void testUpdateAttendanceEndpoint() throws Exception {
        Attendance updated = new Attendance(1L, 100L, LocalDate.now(), LocalTime.of(9, 0), LocalTime.of(17, 0), AttendanceStatus.HALF_DAY);
        when(attendanceService.updateAttendance(eq(1L), any(Attendance.class))).thenReturn(updated);

        mockMvc.perform(put("/api/attendance/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("HALF_DAY"));
    }
}
