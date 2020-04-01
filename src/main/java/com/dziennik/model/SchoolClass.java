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
	private int hourperweek;
	
	public SchoolClass() {
	}

	public SchoolClass(String name, String year, int hourperweek) {
		this.name = name;
		this.year = year;
		this.hourperweek = hourperweek;
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

	public int getHourperweek() {
		return hourperweek;
	}

	public void setHourperweek(int hourperweek) {
		this.hourperweek = hourperweek;
	}

	@Override
	public String toString() {
		return "SchoolClass [idschoolclass=" + idschoolclass + ", name=" + name + ", year=" + year + ", hourperweek="
				+ hourperweek + "]";
	}
}
