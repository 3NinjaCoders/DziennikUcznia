package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Pupil {

	@Id
	private Long id;
	private Long idschoolclass;
	private String firstname;
	private String lastname;
	
	public Pupil() {
	}

	public Pupil(Long id, Long idschoolclass, String firstname, String lastname) {
		this.id = id;
		this.idschoolclass = idschoolclass;
		this.firstname = firstname;
		this.lastname = lastname;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdschoolclass() {
		return idschoolclass;
	}

	public void setIdschoolclass(Long idschoolclass) {
		this.idschoolclass = idschoolclass;
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
		return "Pupil [id=" + id + ", idschoolclass=" + idschoolclass + ", firstname=" + firstname + ", lastname="
				+ lastname + "]";
	}
}
