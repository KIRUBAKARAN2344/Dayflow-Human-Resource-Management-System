package com.dayflow.payroll;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PayrollService {
    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    public Payroll save(Payroll payroll) {
        return payrollRepository.save(payroll);
    }

    public Optional<Payroll> findById(Long id) {
        return payrollRepository.findById(id);
    }

    public Optional<Payroll> findByEmployeeId(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }
}
