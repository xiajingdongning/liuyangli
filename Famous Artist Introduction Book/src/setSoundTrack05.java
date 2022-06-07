import java.io.File;
public interface setSoundTrack05 {
	music m = new music((new File("Picasso.wav")));
	default music set() {
		return m;
	}

}
