import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;

public class VanGogh03 extends JFrame implements setSoundTrack03{
	public VanGogh03() {
		Initial j3 = new Initial("Vincent van Gogh");
		music vs = this.set();
		
		JLabel vs7 = new image(40, 20, 400, 525,"/03_07.png");
		j3.getContentPane().add(vs7);
		vs7.setVisible(true);
		
		JLabel vs8 = new image(485, 20, 512, 402,"/03_08.png");
		j3.getContentPane().add(vs8);
		vs8.setVisible(true);
		
		JLabel vs9 = new image(1043, 20, 400, 486,"/03_09.png");
		j3.getContentPane().add(vs9);
		vs9.setVisible(true);
		
		JTextPane txt6 = new text01(40, 555, 400, 150,"When Gauguin agreed to visit Arles in 1888, Van Gogh hoped for friendship and the realisation of his idea of an artists' collective. "
				+ "While waiting, in August he painted Sunflowers. In preparation for Gauguin's visit, Van Gogh bought two beds on advice from the station's "
				+ "postal supervisor Joseph Roulin, whose portrait he painted. On 17 September, he spent his first night in the still sparsely furnished Yellow House. ",1,15);
		j3.getContentPane().add(txt6);
		txt6.setVisible(true);
		
		JTextPane txt7 = new text01(485, 438, 512, 230,"After much pleading from Van Gogh, Gauguin arrived in Arles on 23 October and, in November, "
				+ "the two painted together. \n\nGauguin depicted Van Gogh in his The Painter of Sunflowers; Van Gogh painted pictures from memory, "
				+ "following Gauguin's suggestion. Among these \"imaginative\" paintings is Memory of the Garden at Etten. "
				+ "\n\nThe \"Garden at Etten\" refers to the parsonage garden at Etten (now Etten-Leur) where Vincent's father, "
				+ "pastor Theodorus van Gogh, had been called in 1875.",1,17);
		j3.getContentPane().add(txt7);
		txt7.setVisible(true);
		
		JTextPane txt8 = new text01(1020, 515, 460, 185,"Van Gogh and Gauguin visited Montpellier in December 1888, where they saw works by "
				+ "Courbet and Delacroix in the Musée Fabre. Their relationship began to deteriorate; Van Gogh admired Gauguin and wanted "
				+ "to be treated as his equal, but Gauguin was arrogant and domineering, which frustrated Van Gogh. \n\nThey often quarrelled; "
				+ "and the situation, which Van Gogh described as one of \"excessive tension\", rapidly headed towards crisis point.  "
				+ "The exact sequence of events which led to Van Gogh's mutilation of his ear is not known.",1,15);
		j3.getContentPane().add(txt8);
		txt8.setVisible(true);
		
		JButton stop = new homeButton("Back to Home");
		stop.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(vs.isPlay()) {
					vs.stopPlay();
				}
				j3.dispose();
				ApplicationDriver a = new ApplicationDriver();
				a.mainMenu(a);
			}
		});
		j3.getContentPane().add(stop);
		
		JButton nc = new nextButton("Next Chapter");
		nc.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				j3.dispose();
				new VanGogh04();
			}
		});
		j3.getContentPane().add(nc);
	}

}
