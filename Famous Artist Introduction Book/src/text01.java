import java.awt.Color;
import java.awt.Font;
import javax.swing.JTextPane;
/**
 * This is for creating custom designed text box
 * @author Yangli Liu
 *
 */
public class text01 extends JTextPane{
	private int posx;
	private int posy;
	private int width;
	private int highth;
	
	public text01(int posx, int posy, int width, int highth, String txt, int font, int size) {
		super();
		this.posx = posx;
		this.posy = posy;
		this.width = width;
		this.highth = highth;
		setForeground(new Color(0, 0, 0));
		setBackground(new Color(255, 255, 255));
		setBounds(posx, posy, width, highth);
		if(font == 1) {setFont(new Font("Georgia", Font.PLAIN, size));}
		if(font == 2) {setFont(new Font("Georgia",  Font.ITALIC, size));}
		if(font == 3) {setFont(new Font("Georgia", Font.BOLD, size));}
		if(font == 4) {setFont(new Font("Georgia", Font.BOLD | Font.ITALIC, size));}
		setText(txt);
	}

}
