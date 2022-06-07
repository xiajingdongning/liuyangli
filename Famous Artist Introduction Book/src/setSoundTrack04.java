import java.io.File;
public interface setSoundTrack04 {
	music m = new music((new File("Monet.wav")));
	default music set() {
		return m;
	}

}
