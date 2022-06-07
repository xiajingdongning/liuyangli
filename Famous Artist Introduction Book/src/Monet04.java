import java.awt.Color;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.net.URL;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;


public class Monet04 extends JFrame implements setSoundTrack04{

	public Monet04() {
		Initial j4 = new Initial("Claude Monet");
		music vs = this.set();
		
		JLabel vs10 = new image(10, 20, 400, 388,"/04_10.png");
		j4.getContentPane().add(vs10);
		vs10.setVisible(true);
		
		JLabel vs11 = new image(430, 320, 720, 351,"/04_11.png");
		j4.getContentPane().add(vs11);
		vs11.setVisible(true);
		
		JLabel vs12 = new image(1070, 20, 400, 263,"/04_12.png");
		j4.getContentPane().add(vs12);
		vs12.setVisible(true);
		
		JTextPane txt9 = new text01(10, 420, 400, 250,"In 1883, Monet and his family rented a house and gardens in Giverny, "
				+ "that provided him domestic stability he had not yet enjoyed. The family worked and built up the gardens, "
				+ "and Monet's fortunes began to change for the better as Durand-Ruel had increasing success in selling his paintings. "
				+ "The gardens were Monet's greatest source of inspiration for 40 years. In 1890, Monet purchased the house. "
				+ "Monet wrote daily instructions to his gardener, precise designs and layouts for plantings, and invoices for his floral purchases and "
				+ "his collection of botany books. As Monet's wealth grew, his garden evolved.",2,16);
		j4.getContentPane().add(txt9);
		txt9.setVisible(true);
		
		JTextPane txt10 = new text01(1170, 320, 270, 255,"During the 1890s, Monet built a greenhouse and a second studio, "
				+ "a spacious building well lit with skylights. Depictions of the water lilies, with alternating light "
				+ "and mirror-like reflections, became an integral part of his work. By the mid-1910s Monet had achieved \"a completely new, "
				+ "fluid, and somewhat audacious style of painting in which the water-lily pond became the point of departure "
				+ "for an almost abstract art\".",2,16);
		j4.getContentPane().add(txt10);
		txt10.setVisible(true);
		
		JTextPane txt11 = new text01(420, 20, 640, 195,"Haystacks is the common English title for a series of impressionist paintings "
				+ "by Claude Monet. The principal subject of each painting in the series is stacks of harvested wheat. "
				+ "The series is famous for the way in which Monet repeated the same subject to show the differing light and "
				+ "atmosphere at different times of day, across the seasons and in many types of weather."
				+ "\n\nMonet died of lung cancer on 5 December 1926 at the age of 86 and is buried in the Giverny church cemetery. "
				+ "At his funeral, Clemenceau removed the black cloth draped over the coffin, stating, \"No black for Monet!\" "
				+ "and replaced it with a flower-patterned cloth.",2,16);
		j4.getContentPane().add(txt11);
		txt11.setVisible(true);
		
		JRadioButton watch = new JRadioButton("Go to watch extra video");
		watch.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				try {
					Desktop.getDesktop().browse(new URL("https://www.youtube.com/embed/vg8wxRtxqkQ").toURI());
				}
				catch(Exception E){
					System.out.println("Error occur.");
				}
				
			}
		});
		watch.setHorizontalAlignment(SwingConstants.CENTER);
		watch.setBackground(Color.WHITE);
		watch.setForeground(Color.BLACK);
		watch.setFont(new Font("Georgia", Font.BOLD | Font.ITALIC, 15));
		watch.setEnabled(false);
		watch.setBounds(610, 255, 220, 35);
		j4.getContentPane().add(watch);
		
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
