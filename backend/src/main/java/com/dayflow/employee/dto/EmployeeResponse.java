package com.dayflow.employee.dto;

import java.time.LocalDate;

public class EmployeeResponse {
    private Long id;
    private Long userId;
    private String phone;
    private String address;
    private String department;
    private String jobTitle;
    private LocalDate joiningDate;
    private String profilePicture;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long id, Long userId, String phone, String address, String department, String jobTitle, LocalDate joiningDate, String profilePicture) {
        this.id = id;
        this.userId = userId;
        this.phone = phone;
        this.address = address;
        this.department = department;
        this.jobTitle = jobTitle;
        this.joiningDate = joiningDate;
        this.profilePicture = profilePicture;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
