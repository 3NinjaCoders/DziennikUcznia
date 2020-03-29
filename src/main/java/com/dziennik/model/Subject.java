package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Subject {

	@Id
	@GeneratedValue
	private Long id;
	private Long idteacher;
	private String name;
	
	public Subject() {
	}

	public Subject(Long idteacher, String name) {
		this.idteacher = idteacher;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdteacher() {
		return idteacher;
	}

	public void setIdteacher(Long idteacher) {
		this.idteacher = idteacher;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Subject [id=" + id + ", idteacher=" + idteacher + ", name=" + name + "]";
	}
}
