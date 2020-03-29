package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SchoolClass {

	@Id
	@GeneratedValue
	private Long idschoolclass;
	private String name;
	private String year;
	
	public SchoolClass() {
	}

	public SchoolClass( String name, String year) {
		this.name = name;
		this.year = year;
	}

	public Long getIdschoolclass() {
		return idschoolclass;
	}

	public void setIdschoolclass(Long idschoolclass) {
		this.idschoolclass = idschoolclass;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	@Override
	public String toString() {
		return "SchoolClass [idschoolclass=" + idschoolclass + ", name=" + name + ", year=" + year + "]";
	}
}
