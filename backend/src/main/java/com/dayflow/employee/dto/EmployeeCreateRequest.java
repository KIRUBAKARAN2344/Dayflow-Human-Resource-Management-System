package com.dayflow.employee.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class EmployeeCreateRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    private String phone;

    private String address;

    @Size(max = 100, message = "Department name cannot exceed 100 characters")
    private String department;

    @Size(max = 100, message = "Job title cannot exceed 100 characters")
    private String jobTitle;

    private LocalDate joiningDate;
    private String profilePicture;

    public EmployeeCreateRequest() {
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
