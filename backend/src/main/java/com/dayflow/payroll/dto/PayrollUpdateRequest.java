package com.dayflow.payroll.dto;

import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

public class PayrollUpdateRequest {
    @DecimalMin(value = "0.0", message = "Basic salary cannot be negative")
    private BigDecimal basicSalary;

    @DecimalMin(value = "0.0", message = "Allowances cannot be negative")
    private BigDecimal allowances;

    @DecimalMin(value = "0.0", message = "Deductions cannot be negative")
    private BigDecimal deductions;

    @DecimalMin(value = "0.0", message = "Net salary cannot be negative")
    private BigDecimal netSalary;

    public PayrollUpdateRequest() {
    }

    // Getters and Setters
    public BigDecimal getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(BigDecimal basicSalary) {
        this.basicSalary = basicSalary;
    }

    public BigDecimal getAllowances() {
        return allowances;
    }

    public void setAllowances(BigDecimal allowances) {
        this.allowances = allowances;
    }

    public BigDecimal getDeductions() {
        return deductions;
    }

    public void setDeductions(BigDecimal deductions) {
        this.deductions = deductions;
    }

    public BigDecimal getNetSalary() {
        return netSalary;
    }

    public void setNetSalary(BigDecimal netSalary) {
        this.netSalary = netSalary;
    }
}
