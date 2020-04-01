package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Timetable {

	@Id
	private String id;
	private Long idclass;
	private Long idteacher;
	
	public Timetable() {
	}

	public Timetable(String id, Long idclass, Long idteacher) {
		this.id = id;
		this.idclass = idclass;
		this.idteacher = idteacher;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getIdclass() {
		return idclass;
	}

	public void setIdclass(Long idclass) {
		this.idclass = idclass;
	}

	public Long getIdteacher() {
		return idteacher;
	}

	public void setIdteacher(Long idteacher) {
		this.idteacher = idteacher;
	}

	@Override
	public String toString() {
		return "Timetable [id=" + id + ", idclass=" + idclass + ", idteacher=" + idteacher + "]";
	}	
}
