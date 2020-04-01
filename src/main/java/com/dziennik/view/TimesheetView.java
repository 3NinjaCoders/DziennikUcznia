package com.dziennik.view;

import java.util.List;

public class TimesheetView {
	
	private Long idpupil;
	private String name;
	private List<Integer> value;
	
	public TimesheetView() {
	}

	public TimesheetView(Long idpupil, String name, List<Integer> value) {
		this.idpupil = idpupil;
		this.name = name;
		this.value = value;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Integer> getValue() {
		return value;
	}

	public void setValue(List<Integer> value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "TimesheetView [idpupil=" + idpupil + ", name=" + name + ", value=" + value + "]";
	}
}
