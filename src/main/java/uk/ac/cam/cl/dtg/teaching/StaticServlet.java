package uk.ac.cam.cl.dtg.teaching;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(//
name = "static",//
urlPatterns = { "/js/*", "/js/foundation/*", "/js/vendor/*", //
		"/img/*", //
		"/css/*", "/css/font/*", "/css/vendor/*", //
		"/about.html" },//
loadOnStartup = 1//
)
public class StaticServlet extends HttpServlet {

	private static final long serialVersionUID = -3745989043025688499L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		RequestDispatcher rd = getServletContext()
				.getNamedDispatcher("default");
		rd.forward(req, resp);
	}
}
