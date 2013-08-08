package uk.ac.cam.cl.dtg.teaching;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.UriBuilder;

import org.jboss.resteasy.client.ClientRequest;
import org.jboss.resteasy.client.ClientRequestFactory;

import com.google.common.collect.ImmutableMap;

public class FrontendServlet extends HttpServlet {
	private static final long serialVersionUID = -7875184838824615593L;
	private String dashboardUrl;
	
	private String cssNamespace = null;
	private String[] cssFiles;
	private String[] jsFiles;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		// Load dashboard API URL from servlet context.
		dashboardUrl = config.getServletContext().getInitParameter("dashboardUrl");

		cssNamespace = config.getServletContext().getInitParameter("cssNamespace");

		// CSS files to include
		String cssFilesStr = config.getServletContext().getInitParameter("cssFiles");

		cssFiles = (cssFilesStr == null) ? new String[] {} : cssFilesStr.split(",");
		
		for(int i = 0; i < cssFiles.length; i++) {
			cssFiles[i] = cssFiles[i].trim();
		}

		// JS files to include
		String jsFilesStr = config.getServletContext().getInitParameter("jsFiles");

		jsFiles = (jsFilesStr == null) ? new String[] {} : jsFilesStr.split(",");
		
		for(int i = 0; i < jsFiles.length; i++) {
			jsFiles[i] = jsFiles[i].trim();
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException, ServletException {

		ClientRequestFactory crf = new ClientRequestFactory(UriBuilder.fromUri(dashboardUrl).build());

		// Load extra javascript/CSS as required.
		req.setAttribute("model", ImmutableMap.of(
			"cssNamespace", cssNamespace,
			"cssFiles",     Arrays.asList(cssFiles),
			"jsFiles",      Arrays.asList(jsFiles),
			"contextPath",  req.getContextPath() + "/",
			"settings", crf.createProxy(DashboardApi.class).getSettings()
		));

		// Direct all requests to the main frontend template via Silken.
		getServletContext().getRequestDispatcher("/soy/frontend.main")
		                   .forward(req, resp);
	}
}
