import java.awt.Color;
import java.awt.Font;
import java.awt.Frame;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextPane;
import javax.swing.Timer;

import com.sun.j3d.utils.applet.MainFrame;

public class Instruction extends JFrame{

	public Instruction() {
		super();
		setTitle("Instruction Pane");
		setSize(300, 420);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		
		setBackground(new Color(211, 211, 211));
		getContentPane().setLayout(null);
		setVisible(true);
		
		JTextPane txt = new text01(30, 10, 220, 60,"Welcome to the \n\t3D gallery!!!",4,20);
		txt.setForeground(SystemColor.desktop);
		getContentPane().add(txt);
		txt.setVisible(true);
		JTextPane instruaction = new text01(50, 85, 180, 230,"Press 'd' to move the object away.\nPress 'f' or 's' to rotate the object"
				+ " at X axis.\nPress 'r' or 'v' to rotate the object at Y axis.\nPress 'e' or 'c' to move the object up / down."
				+ "\nPress 'b' to go back.\nPress 'q' to end the experience.",1,17);
		getContentPane().add(instruaction);
		instruaction.setVisible(true);
		
		Timer timer = new Timer(200000, new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				dispose();
			}
		});
		
		JButton go = new nextButton("GO");
		go.setForeground(Color.WHITE);
		go.setFont(new Font("Georgia", Font.BOLD, 15));
		go.setBackground(SystemColor.desktop);
		go.setBounds(100, 330, 80, 30);
		go.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				Gallery gallery = new Gallery();
			    Frame frame = new MainFrame(gallery, 1400, 760);
			    timer.start();
			}
		});
		getContentPane().add(go);
		go.setVisible(true);
	}
	
}

