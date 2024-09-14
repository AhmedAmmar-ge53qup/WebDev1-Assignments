import Employee from "../models/employee.js";
import Department from "../models/department.js";

export default class EmployeeRepo {

    async addEmployee(employee) {
        return Employee.create(employee);
    }

    async getEmployees() {
        return Employee.find()
    }

    async getEmployee(eid) {
        return Employee.findOne({_id: eid});
    }

    async updateEmployee(eid, updatedEmployee) {
        return Employee.findByIdAndUpdate(eid, updatedEmployee);
    }

    async deleteEmployee(eid) {
        return Employee.deleteOne({_id: eid});
    }

    async deleteAllEmployees() {
        return Employee.deleteMany();
    }

    async getDepartment(did) {
        return Department.findOne({_id: did});
    }

    async getDepartments() {
        return Department.find();
    }


    async getDepartmentsStats() {

        return Employee.aggregate([
            {
                '$lookup': {
                    'from': 'departments',
                    'localField': 'did',
                    'foreignField': 'did',
                    'as': 'dept'
                }
            }, {
                '$group': {
                    '_id': '$did',
                    'did': {
                        '$first': '$did'
                    },
                    'name': {
                        '$first': '$dept.name'
                    },
                    'location': {
                        '$first': '$dept.location'
                    },
                    'numberOfEmployees': {
                        '$count': {}
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'did': 1,
                    'name': {
                        '$arrayElemAt': [
                            '$name', 0
                        ]
                    },
                    'location': {
                        '$arrayElemAt': [
                            '$location', 0
                        ]
                    },
                    'numberOfEmployees': 1
                }
            }
        ])
    }

    async getDepartmentEmployees() {
        return Department.aggregate([
            {
                '$lookup': {
                    'from': 'employees',
                    'localField': 'did',
                    'foreignField': 'did',
                    'as': 'emps'
                }
            }, {
                '$project': {
                    '_id': 0,
                    'emps._id': 0
                }
            }
        ])
    }

}

