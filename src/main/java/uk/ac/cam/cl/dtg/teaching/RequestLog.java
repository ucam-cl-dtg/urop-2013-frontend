package uk.ac.cam.cl.dtg.teaching;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "LOG")
public class RequestLog {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="logIdSeq") 
	@SequenceGenerator(name="logIdSeq",sequenceName="LOG_SEQ", allocationSize=1)
	private int id;
	
	private String crsid;
	private String method;
	private String queryString;
	private String url;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	
	public RequestLog() {}
	public RequestLog(String crsid, String url, String queryString, String method) {
		this.crsid = crsid;
		this.url = url;
		this.timestamp = Calendar.getInstance().getTime();
		this.queryString = queryString;
		this.method = method;
	}
	
	// Setters and getters
	public int getId() {return id;}
	
	public String getCrsid() {return crsid;}
	public void setCrsid(String crsid) {this.crsid = crsid;}
	
	public String getUrl() {return url;}
	public void setUrl(String url) {this.url = url;}

	public Date getTimestamp() {return timestamp;}
	public void setTimestamp(Date timestamp) {this.timestamp = timestamp;}
	
	public String getQueryString() {return queryString;}
	public void setQueryString(String queryString) {this.queryString = queryString;}
	
	public String getMethod() {return method;}
	public void setMethod(String method) {this.method = method;}

}
