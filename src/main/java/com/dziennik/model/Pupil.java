package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Pupil {

	@Id
	private Long id;
	private Long idschoolclass;
	private String firstaname;
	private String lastname;
	
	public Pupil() {
	}

	public Pupil(Long id, Long idschoolclass, String firstaname, String lastname) {
		this.id = id;
		this.idschoolclass = idschoolclass;
		this.firstaname = firstaname;
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

	public String getFirstaname() {
		return firstaname;
	}

	public void setFirstaname(String firstaname) {
		this.firstaname = firstaname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	@Override
	public String toString() {
		return "Pupil [id=" + id + ", idschoolclass=" + idschoolclass + ", firstaname=" + firstaname + ", lastname="
				+ lastname + "]";
	}
}
