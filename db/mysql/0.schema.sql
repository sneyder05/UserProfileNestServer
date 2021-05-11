CREATE TABLE `country` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `city` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`countryId` INT unsigned NOT NULL,
	`name` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`),
  FOREIGN KEY (`countryId`) REFERENCES country(`id`)
) ENGINE=InnoDB;

CREATE TABLE `address` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`cityId` INT unsigned NOT NULL,
	`street` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`),
  FOREIGN KEY (`cityId`) REFERENCES city(`id`)
) ENGINE=InnoDB;

CREATE TABLE `user` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`password` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `profile` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`userId` INT unsigned NOT NULL,
	`addressId` INT unsigned NOT NULL,
	`name` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES user(`id`),
  FOREIGN KEY (`addressId`) REFERENCES address(`id`)
) ENGINE=InnoDB;