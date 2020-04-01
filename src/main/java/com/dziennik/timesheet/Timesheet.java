package com.dziennik.timesheet;

import java.time.LocalDate;
import java.time.YearMonth;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Timesheet {

	@Id
	@GeneratedValue
	private Long id;
	private Long idpupil;
	private Long idclass;
	private Long idteacher;
	private int mon;
	private int year;
	private String value;
	
	public void setVal() {
		YearMonth yearMonthObject = YearMonth.of(year, mon);
		int daysInMonth = yearMonthObject.lengthOfMonth();
		
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < daysInMonth ; i++) {
			sb.append("0");
		}
		value = sb.toString();
	}
	
	public Timesheet() {
	}

	public Timesheet(Long idpupil, Long idclass, Long idteacher, int mon, int year, String value) {
		this.idpupil = idpupil;
		this.idclass = idclass;
		this.idteacher = idteacher;
		this.mon = mon;
		this.year = year;
		this.value = value;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
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

	public int getMon() {
		return mon;
	}

	public void setMon(int mon) {
		this.mon = mon;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Timesheet [id=" + id + ", idpupil=" + idpupil + ", idclass=" + idclass + ", idteacher=" + idteacher
				+ ", mon=" + mon + ", year=" + year + ", value=" + value + "]";
	}
}
