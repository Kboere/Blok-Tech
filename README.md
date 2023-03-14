# 🚘 AutoMatch 🚘
AutoMatch is een matching app waarbij gebruikers kunnen zoeken op events om zo te matchen met mensen die dezelfde interesse delen. Gebruikers vullen hun voorkeuren in en zoeken een evenement naar eigen keuze. Ook kunnen gebruikers evenementen toevoegen en is er de optie om aan te melden. Foto's van prachtige auto's kunnen op hun iegen profiel pagina geplaatst worden waar mensen ook kunnen onder reageren en foto's kunnen liken. Heeft de gebruiker tijdens een venet contact gehad met iemand dan kan hij/zij die toevoegen in de app om af te spreken voor een volgende keer.

## 🎯 Features
Ik heb ervoor gekozen om te focussen op een aantal features. in de tabel hieronder kun je ze bekijken:

| Features | 
| ----------- | 
| Filteren op voorkeuren | 
| Gevonden events weergeven |
| Evenementen toevoegen |

## 🚀 Dit Project Gebruiken?
Om de app te gebruiken moet je deze repository clonen. gebruik de volgende commando in jouw Terminal:
```
git clone https://github.com/Kboere/Blok-Tech
```
De volgende stap is om een [MongoDB](https://www.mongodb.com) account aan te maken met een database en 2 collections. Meer hierover kun je vinden in mijn wiki onder het kopje [Database Structure](https://github.com/Kboere/Blok-Tech/wiki/database).

Zorg ervoor dat je in de "events" collection een aantal evenement hebt staan!

Nadat je dit hebt gedaan is het noodzakelijk om alle **NPM Packeges** te downloaden. Deze kun je zien in de package.json file onder "dependencies". Gebruik hiervoor:
```
$ npm install (naam van package)
```

Je bent er bijna!

Om jouw database te connecten aan het project maak je een .env fila aan via de Terminal (touch .env). Hierin zet je vervolgens de volgende regel code:
```
MONGODB_URI = 'Jouw mongodb connectie link'
```

## GEFELICITEERD!🎉 je kunt de AutoMatch gebruiken!

## ✍🏻 Auteur
Dit project is gemaakt door Kevin Boere

## 📜 License
Copyright © 2023 Kevin Boere

Dit project heeft een [MIT](https://github.com/Kboere/Blok-Tech/blob/main/LICENSE) license
