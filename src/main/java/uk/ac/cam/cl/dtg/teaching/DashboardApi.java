package uk.ac.cam.cl.dtg.teaching;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

public interface DashboardApi {
	
	// Settings
	
	@GET @Path("/settings")
	public Settings getSettings();
	
	public static class Settings {
		private List<MenuItem> sidebar;
		
		public List<MenuItem> getSidebar() {return sidebar;}
		public void setSidebar(List<MenuItem> sidebar) {this.sidebar = sidebar;}
	}
	
	public static class MenuItem {
		private String name;
		private String icon;
		private int iconType;
		private int notificationCount;
		private List<SubMenuItem> links;
		
		public String getName() {return name;}
		public void setName(String name) {this.name = name;}
		
		public String getIcon() {return icon;}
		public void setIcon(String icon) {this.icon = icon;}
		
		public int getIconType() {return iconType;}
		public void setIconType(int iconType) {this.iconType = iconType;}
		
		public List<SubMenuItem> getLinks() {return links;}
		public void setLinks(List<SubMenuItem> links) {this.links = links;}
		
		public int getNotificationCount() {return notificationCount;}
		public void setNotificationCount(int notificationCount) {this.notificationCount = notificationCount;}
	}
	
	public static class SubMenuItem {
		private String name;
		private String icon;
		private int iconType;
		private int notificationCount;
		private String link;
		
		public String getName() {return name;}
		public void setName(String name) {this.name = name;}
		
		public String getIcon() {return icon;}
		public void setIcon(String icon) {this.icon = icon;}
		
		public int getIconType() {return iconType;}
		public void setIconType(int iconType) {this.iconType = iconType;}
		
		public String getLink() {return link;}
		public void setLink(String link) {this.link = link;}
		
		public int getNotificationCount() {return notificationCount;}
		public void setNotificationCount(int notificationCount) {this.notificationCount = notificationCount;}
	}
	
	// Permissions
	
	@GET @Path("/auth/type/{key}")
	public ApiPermissions getApiPermissions(@PathParam("key") String key, @QueryParam("auth") String auth);

	public static class ApiPermissions {
		private String user;
		private String type;
		private String error;
		
		public String getUser() {return user;}
		public void setUser(String user) {this.user = user;}
		
		public String getType() {return type;}
		public void setType(String type) {this.type = type;}
		
		public String getError() {return error;}
		public void setError(String error) {this.error = error;}
	}
	
}
