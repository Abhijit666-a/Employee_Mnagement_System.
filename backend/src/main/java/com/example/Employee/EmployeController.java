package com.example.Employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class EmployeController {
	@Autowired
	public EmployeService Service;

	public EmployeController(EmployeService ss) {
		this.Service = ss;
	}

	@GetMapping("/getEmploye")
	public List<Employe> getEmploye() {
		return Service.getEmploye();
	}

	@PostMapping("/addEmploye")
	public Employe addEmploye(@RequestBody Employe e) {
		return Service.SaveEmploye(e);
	}

	@PutMapping("/updateEmployes/{id}")
	public Employe putEmploye(@PathVariable long id, @RequestBody Employe e) {
		return Service.updateEmploye(id, e);
	}

	@DeleteMapping("/delete/{id}")
	public void postEmployee(@PathVariable long id) {
		Service.deleteEmploye(id);
	}

	@GetMapping("/getemploye/{name}")
	public List<Employe> getemploye(@PathVariable String name) {
		return Service.getEmployeName(name);
	}

	@GetMapping("/getAllEmployees")
	public List<Employe> getjoiningemploye() {
		return Service.getallgemploye();
	}
}
