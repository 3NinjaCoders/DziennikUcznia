package com.dziennik.view;

import java.util.List;

public class TimesheetPupilView {
	private Long idpupil;
	private String subjectname;
	private String teachername;
	private List<String> value;
	
	public TimesheetPupilView() {
	}

	public TimesheetPupilView(Long idpupil, String subjectname, String teachername, List<String> value) {
		this.idpupil = idpupil;
		this.subjectname = subjectname;
		this.teachername = teachername;
		this.value = value;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public String getSubjectname() {
		return subjectname;
	}

	public void setSubjectname(String subjectname) {
		this.subjectname = subjectname;
	}

	public String getTeachername() {
		return teachername;
	}

	public void setTeachername(String teachername) {
		this.teachername = teachername;
	}

	public List<String> getValue() {
		return value;
	}

	public void setValue(List<String> value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "TimesheetPupilView [idpupil=" + idpupil + ", subjectname=" + subjectname + ", teachername="
				+ teachername + ", value=" + value + "]";
	}	
}
