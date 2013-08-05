package uk.ac.cam.cl.dtg.teaching;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Arrays;
import com.google.common.collect.ImmutableMap;

public class FrontendServlet extends HttpServlet {
  private String cssNamespace = null;
  private String[] cssFiles;
  private String[] jsFiles;

  @Override
	public void init(ServletConfig config) throws ServletException {
	  super.init(config);
	  
    cssNamespace = config.getServletContext().getInitParameter("cssNamespace");

    // CSS files to include
    String cssFilesStr = config.getServletContext().getInitParameter("cssFiles");

    cssFiles = (cssFilesStr == null) ? new String[] {} : cssFilesStr.split(",");

    // JS files to include
    String jsFilesStr = config.getServletContext().getInitParameter("jsFiles");
		
    jsFiles = (jsFilesStr == null) ? new String[] {} : jsFilesStr.split(",");
	}
	
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
                                          throws IOException, ServletException {
    // TODO: Pull menu information from dashboard API
    
    // Load extra javascript/CSS as required.
    req.setAttribute("model", ImmutableMap.of(
      "cssNamespace", cssNamespace,
      "cssFiles",     Arrays.asList(cssFiles),
      "jsFiles",      Arrays.asList(jsFiles)
    ));

    // Direct all requests to the main frontend template via Silken.
    getServletContext().getRequestDispatcher("/soy/frontend.main")
                       .forward(req, resp);
  }
}
