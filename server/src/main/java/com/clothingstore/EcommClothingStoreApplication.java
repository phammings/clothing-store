package com.clothingstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class EcommClothingStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommClothingStoreApplication.class, args);
	}

}
