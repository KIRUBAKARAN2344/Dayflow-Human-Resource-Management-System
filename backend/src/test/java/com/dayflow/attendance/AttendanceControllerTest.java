package com.dayflow.attendance;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AttendanceControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AttendanceService attendanceService;

    @InjectMocks
    private AttendanceController attendanceController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(attendanceController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

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
