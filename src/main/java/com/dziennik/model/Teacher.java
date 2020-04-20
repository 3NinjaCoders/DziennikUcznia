package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Teacher {

	@Id
	private Long id;
	private Long idsubject;
	private String firstname;
	private String lastname;
	
	public Teacher() {
	}

	public Teacher(Long id, Long idsubject, String firstname, String lastname) {
		this.id = id;
		this.idsubject = idsubject;
		this.firstname = firstname;
		this.lastname = lastname;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdsubject() {
		return idsubject;
	}

	public void setIdsubject(Long idsubject) {
		this.idsubject = idsubject;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	@Override
	public String toString() {
		return "Teacher [id=" + id + ", idsubject=" + idsubject + ", firstname=" + firstname + ", lastname=" + lastname
				+ "]";
	}
}
