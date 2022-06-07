import java.awt.Color;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;

public class nextButton extends JButton{
	public nextButton(String text){
		super(text);
		setForeground(Color.WHITE);
		setFont(new Font("Georgia", Font.BOLD, 13));
		setBackground(SystemColor.desktop);
		setBounds(780, 680, 133, 21);
	}
}
