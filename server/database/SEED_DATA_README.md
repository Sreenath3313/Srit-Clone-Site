# Seed Data Setup Guide

This guide explains how to populate the College ERP system with comprehensive test data.

## Overview

The `seed-data.sql` file provides:
- **4 Departments**: CSE, ECE, MECH, CIVIL
- **32 Sections**: 8 sections per department (Years 1-4, Sections A & B)
- **28 Subjects**: Sample subjects for each department
- **10 Faculty Members**: With different specializations
- **10 Students**: In CSE Year 3 Section A for testing
- **9 Timetable Assignments**: Faculty assigned to teach classes
- **20 Sample Attendance Records**: For Machine Learning class
- **10 Sample Marks Records**: For Machine Learning subject

## Important Note About User Accounts

⚠️ **The seed data contains placeholder `user_id` values!**

Before the faculty and students can login, you must:
1. Create user accounts in Supabase Auth
2. Update the `user_id` values in the seed data OR
3. Use the admin API endpoints to create users programmatically

## Method 1: Manual Setup (Using Supabase Dashboard)

### Step 1: Run Schema First
```bash
# In Supabase SQL Editor, run:
server/database/schema.sql
```

### Step 2: Create Admin User
1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **Add User** → **Create new user**
3. Fill in:
   - Email: `admin@college.edu`
   - Password: `admin123`
   - Auto Confirm User: **Yes**
4. After creating, click on the user
5. In **User Metadata** section, add:
   ```json
   {
     "role": "admin",
     "name": "System Administrator"
   }
   ```
6. Click **Save**

### Step 3: Run Seed Data
```bash
# In Supabase SQL Editor, run:
server/database/seed-data.sql
```

This creates all departments, sections, subjects, and placeholder records for faculty and students.

### Step 4: Create Faculty User Accounts

For **each faculty member**, create a user account in Supabase Auth:

| Email | Password | Name | User Metadata |
|-------|----------|------|---------------|
| lakshmi.devi@college.edu | faculty123 | Prof. Lakshmi Devi | `{"role": "faculty", "name": "Prof. Lakshmi Devi"}` |
| rajesh.kumar@college.edu | faculty123 | Dr. Rajesh Kumar | `{"role": "faculty", "name": "Dr. Rajesh Kumar"}` |
| arun.sharma@college.edu | faculty123 | Prof. Arun Sharma | `{"role": "faculty", "name": "Prof. Arun Sharma"}` |
| priya.reddy@college.edu | faculty123 | Dr. Priya Reddy | `{"role": "faculty", "name": "Dr. Priya Reddy"}` |
| sneha.patel@college.edu | faculty123 | Prof. Sneha Patel | `{"role": "faculty", "name": "Prof. Sneha Patel"}` |
| vijay.singh@college.edu | faculty123 | Dr. Vijay Singh | `{"role": "faculty", "name": "Dr. Vijay Singh"}` |
| meera.joshi@college.edu | faculty123 | Prof. Meera Joshi | `{"role": "faculty", "name": "Prof. Meera Joshi"}` |
| kiran.kumar@college.edu | faculty123 | Dr. Kiran Kumar | `{"role": "faculty", "name": "Dr. Kiran Kumar"}` |
| anita.desai@college.edu | faculty123 | Prof. Anita Desai | `{"role": "faculty", "name": "Prof. Anita Desai"}` |
| rahul.verma@college.edu | faculty123 | Dr. Rahul Verma | `{"role": "faculty", "name": "Dr. Rahul Verma"}` |

### Step 5: Update Faculty Records with Real User IDs

After creating each faculty user, **copy their `user_id`** (UUID) from Supabase Auth and run:

```sql
-- Update faculty records with actual user_ids
UPDATE faculty SET user_id = 'ACTUAL_USER_ID_FROM_AUTH' WHERE employee_id = 'FAC001';
UPDATE faculty SET user_id = 'ACTUAL_USER_ID_FROM_AUTH' WHERE employee_id = 'FAC002';
-- ... repeat for all 10 faculty members
```

### Step 6: Create Student User Accounts

For **each student**, create a user account:

| Email | Password | Name | User Metadata |
|-------|----------|------|---------------|
| 20cs101@student.college.edu | student123 | Arun Sharma | `{"role": "student", "name": "Arun Sharma"}` |
| 20cs102@student.college.edu | student123 | Priya Reddy | `{"role": "student", "name": "Priya Reddy"}` |
| 20cs103@student.college.edu | student123 | Rahul Kumar | `{"role": "student", "name": "Rahul Kumar"}` |
| 20cs104@student.college.edu | student123 | Sneha Devi | `{"role": "student", "name": "Sneha Devi"}` |
| 20cs105@student.college.edu | student123 | Vijay Singh | `{"role": "student", "name": "Vijay Singh"}` |
| 20cs106@student.college.edu | student123 | Meera Patel | `{"role": "student", "name": "Meera Patel"}` |
| 20cs107@student.college.edu | student123 | Kiran Joshi | `{"role": "student", "name": "Kiran Joshi"}` |
| 20cs108@student.college.edu | student123 | Anita Verma | `{"role": "student", "name": "Anita Verma"}` |
| 20cs109@student.college.edu | student123 | Ravi Shankar | `{"role": "student", "name": "Ravi Shankar"}` |
| 20cs110@student.college.edu | student123 | Deepika Nair | `{"role": "student", "name": "Deepika Nair"}` |

### Step 7: Update Student Records with Real User IDs

```sql
-- Update student records with actual user_ids
UPDATE students SET user_id = 'ACTUAL_USER_ID_FROM_AUTH' WHERE roll_no = '20CS101';
UPDATE students SET user_id = 'ACTUAL_USER_ID_FROM_AUTH' WHERE roll_no = '20CS102';
-- ... repeat for all 10 students
```

## Method 2: Programmatic Setup (Using Admin API)

**This is the RECOMMENDED method** - it's faster and creates user accounts automatically!

### Prerequisites
- Backend server running
- Admin user already created and logged in
- Admin auth token available

### Step 1: Run Schema and Seed Data
```bash
# In Supabase SQL Editor:
1. Run server/database/schema.sql
2. Run server/database/seed-data.sql (creates placeholder records)
```

### Step 2: Use Admin API to Create Faculty (with user accounts)

```bash
# Example using curl (replace TOKEN with your admin JWT token)
curl -X POST http://localhost:5000/api/admin/faculty \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "FAC001",
    "name": "Prof. Lakshmi Devi",
    "department_id": "d1111111-1111-1111-1111-111111111111",
    "email": "lakshmi.devi@college.edu",
    "password": "faculty123"
  }'
```

**Repeat for all 10 faculty members**, updating the IDs of existing placeholder records.

### Step 3: Use Admin API to Create Students

```bash
curl -X POST http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roll_no": "20CS101",
    "name": "Arun Sharma",
    "section_id": "s1111111-1111-1111-1111-111111111115",
    "admission_year": 2020,
    "email": "20cs101@student.college.edu",
    "password": "student123"
  }'
```

**Repeat for all 10 students**.

## Verification

After setup, verify everything works:

### 1. Login as Admin
- Email: `admin@college.edu`
- Password: `admin123`
- Should see all departments, sections, subjects, faculty, and students

### 2. Login as Faculty (e.g., Prof. Lakshmi Devi)
- Email: `lakshmi.devi@college.edu`
- Password: `faculty123`
- Navigate to **Attendance** page
- Should see **CSE Year 3 Section A** students listed
- Should see **Machine Learning** subject
- Can mark attendance for the students

### 3. Login as Student (e.g., Arun Sharma)
- Email: `20cs101@student.college.edu`
- Password: `student123`
- Navigate to **Attendance** page
- Should see attendance records for Machine Learning
- Navigate to **Marks** page
- Should see marks: Internal 1: 18, Internal 2: 19, External: 85

## Test Scenarios

### Faculty Attendance Marking
1. Login as Prof. Lakshmi Devi
2. Go to Attendance page
3. Select "Machine Learning - CSE Year 3 A"
4. Should see 10 students listed
5. Mark today's attendance
6. Save successfully

### Faculty Marks Entry
1. Login as Dr. Rajesh Kumar
2. Go to Marks page
3. Select "Data Structures - CSE Year 3 A"
4. Should see 10 students
5. Enter marks for Internal 1
6. Save successfully

### Student Views
1. Login as any student
2. View attendance percentage by subject
3. View marks with grades
4. View timetable for the week

## Troubleshooting

### "No students found" in Faculty Dashboard
**Cause**: User accounts not created or `user_id` not updated in faculty/student tables

**Solution**:
1. Check if users exist in Supabase Auth → Users
2. Verify `user_id` in faculty/students tables matches Auth user IDs
3. Run the UPDATE queries from Step 5 and Step 7 above

### "Faculty profile not found"
**Cause**: Logged-in user's `user_id` doesn't match any record in `faculty` table

**Solution**:
```sql
-- Check if faculty record exists
SELECT * FROM faculty WHERE user_id = 'YOUR_USER_ID';

-- If missing, insert or update
UPDATE faculty SET user_id = 'YOUR_USER_ID' WHERE employee_id = 'FAC001';
```

### "You are not assigned to teach this section"
**Cause**: No timetable entry linking faculty to the section

**Solution**:
```sql
-- Check timetable assignments
SELECT * FROM timetable WHERE faculty_id = 'YOUR_FACULTY_ID';

-- Add timetable entry if missing (see seed-data.sql for examples)
```

## Adding More Data

### Add More Students to Different Sections
```sql
INSERT INTO students (id, user_id, roll_no, name, section_id, admission_year) VALUES
(gen_random_uuid(), 'USER_ID_FROM_AUTH', '21CS201', 'New Student', 's1111111-1111-1111-1111-111111111113', 2021)
ON CONFLICT (roll_no) DO NOTHING;
```

### Assign More Classes to Faculty
```sql
INSERT INTO timetable (id, section_id, subject_id, faculty_id, day, period) VALUES
(gen_random_uuid(), 'SECTION_ID', 'SUBJECT_ID', 'FACULTY_ID', 'Monday', 4)
ON CONFLICT (section_id, day, period) DO NOTHING;
```

## Summary

The seed data provides a complete, working dataset for testing all features of the College ERP system:
- ✅ Admin can manage all entities
- ✅ Faculty can see their assigned students
- ✅ Faculty can mark attendance
- ✅ Faculty can enter marks
- ✅ Students can view their records
- ✅ All relationships properly linked

Make sure to update the `user_id` values after creating actual user accounts in Supabase Auth!
