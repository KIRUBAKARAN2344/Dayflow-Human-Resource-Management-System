package com.dayflow.config;

import com.dayflow.attendance.Attendance;
import com.dayflow.attendance.AttendanceRepository;
import com.dayflow.attendance.AttendanceStatus;
import com.dayflow.employee.Employee;
import com.dayflow.employee.EmployeeRepository;
import com.dayflow.leave.LeaveRequest;
import com.dayflow.leave.LeaveRequestRepository;
import com.dayflow.leave.LeaveStatus;
import com.dayflow.leave.LeaveType;
import com.dayflow.payroll.Payroll;
import com.dayflow.payroll.PayrollRepository;
import com.dayflow.user.Role;
import com.dayflow.user.User;
import com.dayflow.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Seeds realistic demo data into the database on application startup.
 * Runs only once — skipped if any users already exist (idempotent guard).
 * H2-safe: tests use ddl-auto=create-drop so H2 starts fresh every time.
 */
@Component
public class DataSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PayrollRepository payrollRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      EmployeeRepository employeeRepository,
                      PayrollRepository payrollRepository,
                      AttendanceRepository attendanceRepository,
                      LeaveRequestRepository leaveRequestRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.payrollRepository = payrollRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (userRepository.count() > 0) {
            log.info("DataSeeder: data already exists — skipping seed.");
            return;
        }

        log.info("DataSeeder: seeding demo data...");

        // ── 1. USERS ─────────────────────────────────────────────────────────
        User admin = createUser("EMP001", "Admin User",
                "admin@dayflow.com", "Admin@123", Role.ADMIN);
        User hrManager = createUser("EMP002", "HR Manager",
                "hr@dayflow.com", "Hr@123", Role.ADMIN);

        User arjunUser = createUser("EMP003", "Arjun Sharma",
                "arjun.sharma@dayflow.com", "Emp@123", Role.EMPLOYEE);
        User priyaUser = createUser("EMP004", "Priya Nair",
                "priya.nair@dayflow.com", "Emp@123", Role.EMPLOYEE);
        User rahulUser = createUser("EMP005", "Rahul Verma",
                "rahul.verma@dayflow.com", "Emp@123", Role.EMPLOYEE);
        User snehaUser = createUser("EMP006", "Sneha Pillai",
                "sneha.pillai@dayflow.com", "Emp@123", Role.EMPLOYEE);
        User kiranUser = createUser("EMP007", "Kiran Reddy",
                "kiran.reddy@dayflow.com", "Emp@123", Role.EMPLOYEE);

        userRepository.saveAll(List.of(admin, hrManager, arjunUser, priyaUser,
                rahulUser, snehaUser, kiranUser));
        log.info("DataSeeder: {} users saved.", 7);

        // ── 2. EMPLOYEES ─────────────────────────────────────────────────────
        Employee arjun = createEmployee(arjunUser, "+91-9876543210",
                "12, MG Road, Bengaluru, Karnataka 560001",
                "Engineering", "Senior Software Engineer",
                LocalDate.of(2022, 3, 15));

        Employee priya = createEmployee(priyaUser, "+91-9876543211",
                "45, Anna Nagar, Chennai, Tamil Nadu 600040",
                "Engineering", "Frontend Developer",
                LocalDate.of(2023, 6, 1));

        Employee rahul = createEmployee(rahulUser, "+91-9876543212",
                "78, Connaught Place, New Delhi 110001",
                "Marketing", "Marketing Analyst",
                LocalDate.of(2021, 11, 20));

        Employee sneha = createEmployee(snehaUser, "+91-9876543213",
                "23, Bandra West, Mumbai, Maharashtra 400050",
                "Human Resources", "HR Executive",
                LocalDate.of(2023, 1, 10));

        Employee kiran = createEmployee(kiranUser, "+91-9876543214",
                "56, Jubilee Hills, Hyderabad, Telangana 500033",
                "Finance", "Financial Analyst",
                LocalDate.of(2022, 8, 5));

        employeeRepository.saveAll(List.of(arjun, priya, rahul, sneha, kiran));
        log.info("DataSeeder: {} employees saved.", 5);

        // ── 3. PAYROLL ────────────────────────────────────────────────────────
        Payroll arjunPayroll = createPayroll(arjun,
                new BigDecimal("85000.00"),
                new BigDecimal("15000.00"),
                new BigDecimal("10200.00"),
                new BigDecimal("89800.00"));

        Payroll priyaPayroll = createPayroll(priya,
                new BigDecimal("65000.00"),
                new BigDecimal("10000.00"),
                new BigDecimal("9000.00"),
                new BigDecimal("66000.00"));

        Payroll rahulPayroll = createPayroll(rahul,
                new BigDecimal("55000.00"),
                new BigDecimal("8000.00"),
                new BigDecimal("7560.00"),
                new BigDecimal("55440.00"));

        Payroll snehaPayroll = createPayroll(sneha,
                new BigDecimal("50000.00"),
                new BigDecimal("7500.00"),
                new BigDecimal("6900.00"),
                new BigDecimal("50600.00"));

        Payroll kiranPayroll = createPayroll(kiran,
                new BigDecimal("72000.00"),
                new BigDecimal("12000.00"),
                new BigDecimal("9840.00"),
                new BigDecimal("74160.00"));

        payrollRepository.saveAll(List.of(arjunPayroll, priyaPayroll,
                rahulPayroll, snehaPayroll, kiranPayroll));
        log.info("DataSeeder: {} payroll records saved.", 5);

        // ── 4. ATTENDANCE (last 10 working days per employee) ─────────────────
        List<Attendance> attendances = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (Employee emp : List.of(arjun, priya, rahul, sneha, kiran)) {
            int workDayCount = 0;
            LocalDate cursor = today.minusDays(1); // start from yesterday

            while (workDayCount < 10) {
                // skip weekends
                int dow = cursor.getDayOfWeek().getValue(); // 1=Mon … 7=Sun
                if (dow < 6) {
                    AttendanceStatus status = (workDayCount == 3 || workDayCount == 7)
                            ? AttendanceStatus.HALF_DAY
                            : AttendanceStatus.PRESENT;

                    LocalTime checkIn  = LocalTime.of(9, 0).plusMinutes((emp.getId() % 5) * 5);
                    LocalTime checkOut = (status == AttendanceStatus.HALF_DAY)
                            ? LocalTime.of(13, 30)
                            : LocalTime.of(18, 0).plusMinutes((emp.getId() % 3) * 10);

                    Attendance a = new Attendance();
                    a.setEmployeeId(emp.getId());
                    a.setDate(cursor);
                    a.setCheckIn(checkIn);
                    a.setCheckOut(checkOut);
                    a.setStatus(status);
                    attendances.add(a);
                    workDayCount++;
                }
                cursor = cursor.minusDays(1);
            }
        }

        attendanceRepository.saveAll(attendances);
        log.info("DataSeeder: {} attendance records saved.", attendances.size());

        // ── 5. LEAVE REQUESTS ─────────────────────────────────────────────────
        List<LeaveRequest> leaves = new ArrayList<>();

        // Arjun — approved paid leave last month
        leaves.add(createLeave(arjun.getId(), LeaveType.PAID,
                today.minusMonths(1).withDayOfMonth(5),
                today.minusMonths(1).withDayOfMonth(7),
                "Family function — annual ceremony", LeaveStatus.APPROVED));

        // Priya — approved sick leave
        leaves.add(createLeave(priya.getId(), LeaveType.SICK,
                today.minusWeeks(3),
                today.minusWeeks(3).plusDays(1),
                "Fever and viral infection", LeaveStatus.APPROVED));

        // Rahul — pending paid leave (upcoming)
        leaves.add(createLeave(rahul.getId(), LeaveType.PAID,
                today.plusWeeks(1),
                today.plusWeeks(1).plusDays(4),
                "Planned vacation to Goa", LeaveStatus.PENDING));

        // Sneha — approved sick leave
        leaves.add(createLeave(sneha.getId(), LeaveType.SICK,
                today.minusDays(5),
                today.minusDays(5),
                "Doctor appointment — routine checkup", LeaveStatus.APPROVED));

        // Kiran — rejected unpaid leave
        leaves.add(createLeave(kiran.getId(), LeaveType.UNPAID,
                today.minusWeeks(2),
                today.minusWeeks(2).plusDays(2),
                "Personal emergency", LeaveStatus.REJECTED));

        // Priya — pending upcoming leave
        leaves.add(createLeave(priya.getId(), LeaveType.PAID,
                today.plusDays(10),
                today.plusDays(14),
                "Annual family trip", LeaveStatus.PENDING));

        leaveRequestRepository.saveAll(leaves);
        log.info("DataSeeder: {} leave requests saved.", leaves.size());

        log.info("DataSeeder: demo data seeding complete ✓");
        log.info("─────────────────────────────────────────────────────────────");
        log.info("  Demo credentials:");
        log.info("  Admin  → admin@dayflow.com     / Admin@123");
        log.info("  HR     → hr@dayflow.com        / Hr@123");
        log.info("  Emp    → arjun.sharma@dayflow.com / Emp@123");
        log.info("─────────────────────────────────────────────────────────────");
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private User createUser(String employeeId, String name, String email,
                            String rawPassword, Role role) {
        User u = new User();
        u.setEmployeeId(employeeId);
        u.setName(name);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(rawPassword));
        u.setRole(role);
        u.setEnabled(true);
        return u;
    }

    private Employee createEmployee(User user, String phone, String address,
                                    String department, String jobTitle,
                                    LocalDate joiningDate) {
        Employee e = new Employee();
        e.setUser(user);
        e.setPhone(phone);
        e.setAddress(address);
        e.setDepartment(department);
        e.setJobTitle(jobTitle);
        e.setJoiningDate(joiningDate);
        return e;
    }

    private Payroll createPayroll(Employee employee, BigDecimal basicSalary,
                                  BigDecimal allowances, BigDecimal deductions,
                                  BigDecimal netSalary) {
        Payroll p = new Payroll();
        p.setEmployee(employee);
        p.setBasicSalary(basicSalary);
        p.setAllowances(allowances);
        p.setDeductions(deductions);
        p.setNetSalary(netSalary);
        return p;
    }

    private LeaveRequest createLeave(Long employeeId, LeaveType type,
                                     LocalDate start, LocalDate end,
                                     String reason, LeaveStatus status) {
        LeaveRequest lr = new LeaveRequest();
        lr.setEmployeeId(employeeId);
        lr.setLeaveType(type);
        lr.setStartDate(start);
        lr.setEndDate(end);
        lr.setReason(reason);
        lr.setStatus(status);
        return lr;
    }
}
