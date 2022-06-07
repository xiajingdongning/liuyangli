import java.awt.Color;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.net.URL;

import javax.print.attribute.standard.Media;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;
import javax.swing.Timer;


public class VanGogh04 extends JFrame implements setSoundTrack03{

	public VanGogh04() {
		Initial j4 = new Initial("Vincent van Gogh");
		music vs = this.set();
		
		JLabel vs10 = new image(40, 0, 400, 516,"/03_10.png");
		j4.getContentPane().add(vs10);
		vs10.setVisible(true);
		
		JLabel vs11 = new image(482, 65, 512, 400,"/03_11.png");
		j4.getContentPane().add(vs11);
		vs11.setVisible(true);
		
		JLabel vs12 = new image(1040, 0, 400, 513,"/03_12.png");
		j4.getContentPane().add(vs12);
		vs12.setVisible(true);
		
		JTextPane txt9 = new text01(40, 510, 1402, 167,"He spent time in psychiatric hospitals, including a period at Saint-Rémy. "
				+ "After he discharged himself and moved to the Auberge Ravoux in Auvers-sur-Oise near Paris, "
				+ "he came under the care of the homeopathic doctor Paul Gachet. \n\tHis depression persisted, and on 27 July 1890, "
				+ "Van Gogh is believed to have shot himself in the chest with a Lefaucheux revolver. He died from his injuries two days later."
				+ "\nVan Gogh was commercially unsuccessful during his lifetime, and he was considered a madman and a failure. "
				+ "As he only became famous after his suicide, he came to be seen as a misunderstood genius in the public imagination. "
				+ "His reputation grew in the early 20th century as elements of his style came to be incorporated by the Fauves and German "
				+ "Expressionists. He attained widespread critical and commercial success over the ensuing decades, and is remembered as "
				+ "an important but tragic painter whose troubled personality typifies the romantic ideal of the tortured artist. "
				+ "Today, Van Gogh's works are among the world's most expensive paintings to have ever sold, and his legacy is honoured by "
				+ "a museum in his name, the Van Gogh Museum in Amsterdam, which holds the world's largest collection of his paintings and drawings.",1,17);
		j4.getContentPane().add(txt9);
		txt9.setVisible(true);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j4.getContentPane().add(stop);
		
		JButton gallery = new nextButton("3D Gallery");
	    gallery.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j4.dispose();
				new Instruction();
			}
		});
	    j4.getContentPane().add(gallery);
	    gallery.setVisible(true);
	}
	
	

}
