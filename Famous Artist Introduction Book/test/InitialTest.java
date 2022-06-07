import static org.junit.Assert.*;

import org.junit.Test;
/**
 * This is for understanding how to JUnit test JFrame
 * Test the initial board, same way can apply to other portions of this project
 * @author Yangli Liu
 * I think no more test needed, as you can test the functions by playing this application
 */
public class InitialTest {

	@Test
	public void testInitial() {
		Initial i = new Initial("hi");
		assertNotNull(i);
		int height=i.getHeight();
        int width=i.getWidth();
        assertEquals(760,height);
        assertEquals(1500,width);
        String str=i.getTitle();
        assertEquals("hi",str);
        assertEquals(i.isVisible(),true);
	}

}
