import java.awt.Color;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;

public class homeButton extends JButton{
	public homeButton(String text){
		super(text);
		setBackground(SystemColor.desktop);
		setForeground(Color.WHITE);
		setFont(new Font("Georgia", Font.BOLD, 13));
		setBounds(560, 680, 133, 21);
	}
}
