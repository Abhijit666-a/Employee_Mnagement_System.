package com.example.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employe")

public class Employe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	long id;

	String name;

	int salary;

	String department;

	String email;
	
	@Column(name="joiningYear")
	String joiningYear;
	
	@Column(name="on_project")
	Boolean onProject;

	
	public Boolean getOnProject() {
		return onProject;
	}

	public void setOnProject(Boolean onProject) {
		this.onProject = onProject;
	}

	public String getJoiningYear() {
		return joiningYear;
	}

	public void setJoiningYear(String joiningYear) {
		this.joiningYear = joiningYear;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public Object getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

}
