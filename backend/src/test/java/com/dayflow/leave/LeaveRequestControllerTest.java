package com.dayflow.leave;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LeaveRequestController.class)
@AutoConfigureMockMvc(addFilters = false)
class LeaveRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeaveRequestService leaveRequestService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testApplyLeaveEndpoint() throws Exception {
        LeaveRequest req = new LeaveRequest(null, 100L, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(2), "Vacation", null);
        LeaveRequest created = new LeaveRequest(1L, 100L, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(2), "Vacation", LeaveStatus.PENDING);

        when(leaveRequestService.applyLeave(any(LeaveRequest.class))).thenReturn(created);

        mockMvc.perform(post("/api/leaves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void testGetMyLeavesEndpoint() throws Exception {
        LeaveRequest leave = new LeaveRequest(1L, 100L, LeaveType.SICK, LocalDate.now(), LocalDate.now().plusDays(1), "Fever", LeaveStatus.PENDING);
        when(leaveRequestService.getEmployeeLeaves(100L)).thenReturn(List.of(leave));

        mockMvc.perform(get("/api/leaves/me")
                        .param("employeeId", "100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeId").value(100L));
    }

    @Test
    void testGetLeaveByIdEndpoint() throws Exception {
        LeaveRequest leave = new LeaveRequest(1L, 100L, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Vacation", LeaveStatus.PENDING);
        when(leaveRequestService.getLeaveById(1L)).thenReturn(leave);

        mockMvc.perform(get("/api/leaves/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetAllLeavesEndpoint() throws Exception {
        LeaveRequest leave = new LeaveRequest(1L, 100L, LeaveType.UNPAID, LocalDate.now(), LocalDate.now().plusDays(1), "Personal", LeaveStatus.PENDING);
        when(leaveRequestService.getAllLeaves(LeaveStatus.PENDING)).thenReturn(List.of(leave));

        mockMvc.perform(get("/api/leaves")
                        .param("status", "PENDING"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("PENDING"));
    }

    @Test
    void testApproveLeaveEndpoint() throws Exception {
        LeaveRequest approved = new LeaveRequest(1L, 100L, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Vacation", LeaveStatus.APPROVED);
        when(leaveRequestService.approveLeave(1L)).thenReturn(approved);

        mockMvc.perform(put("/api/leaves/1/approve"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("APPROVED"));
    }

    @Test
    void testRejectLeaveEndpoint() throws Exception {
        LeaveRequest rejected = new LeaveRequest(1L, 100L, LeaveType.PAID, LocalDate.now(), LocalDate.now().plusDays(1), "Vacation", LeaveStatus.REJECTED);
        when(leaveRequestService.rejectLeave(1L)).thenReturn(rejected);

        mockMvc.perform(put("/api/leaves/1/reject"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REJECTED"));
    }
}
