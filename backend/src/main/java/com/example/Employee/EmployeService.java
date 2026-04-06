package com.example.Employee;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EmployeService {
	public EmployeeRepository repo;

	public EmployeService(EmployeeRepository repo) {
		this.repo = repo;
	}

	public List<Employe> getEmploye() {
		return repo.findAll();
	}

	public Employe SaveEmploye(Employe e) {
		return repo.save(e);
	}

	public Employe updateEmploye(long id, Employe e) {
		Employe em = repo.findById(id).orElse(null);
		if (em != null) {
			em.setName(e.getName());
			em.setSalary(e.getSalary());
			em.setEmail(e.getEmail()); 
	        em.setDepartment(e.getDepartment());
	        em.setJoiningYear(e.getJoiningYear());
//	        em.setOnProject(e.getOnProject());
	        em.setOnProject(e.getOnProject() != null ? e.getOnProject() : false);
		}
		return repo.save(em);
	}

	public void deleteEmploye(long id) {
		repo.deleteById(id);

	}
	
	public List<Employe> getEmployeName(String name) {
		return repo.findByNameContainingIgnoreCase(name);
	}
	
	public List<Employe> getallgemploye(){
		return repo.findAll();
	}

}
