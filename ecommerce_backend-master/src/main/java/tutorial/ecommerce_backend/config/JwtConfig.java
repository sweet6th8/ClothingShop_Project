package tutorial.ecommerce_backend.config;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;

import tutorial.ecommerce_backend.jwt.JWTService;

@Configuration
public class JwtConfig {
	
	@Value("${jwt.base64-secret}")
	private String jwtKey;
	
	@Bean
	public JwtEncoder jwtEncoder() {
		return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
	}
	
	public SecretKey getSecretKey() {
		byte[] keyBytes = Base64.encode(jwtKey).decode();
		return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWTService.JWT_ALGORITHM.getName());
	}
	
	@Bean
	public JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey())
				.macAlgorithm(JWTService.JWT_ALGORITHM).build();
		return token -> {
			try {
				return jwtDecoder.decode(token);
			} catch (Exception e) {
				System.out.println("jwt error:" + e.getMessage());
				throw e;
			}
		};
	}
}
