# Deploy Dracikovske rozpravky

Tento priecinok `web` je koren GitHub repozitara aj koren webu, ktory sa nahrava na hosting.

## 1. GitHub repozitar

Odporucany nazov repozitara:

```text
dracikovske-rozpravky
```

Po vytvoreni prazdneho repozitara na GitHube sa prida remote:

```powershell
git remote add origin https://github.com/TVOJ-UCET/dracikovske-rozpravky.git
git push -u origin main
```

## 2. GitHub Secrets

V repozitari otvor:

```text
Settings > Secrets and variables > Actions > Repository secrets
```

Pridaj tieto 4 secrety:

```text
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
FTP_SERVER_DIR
```

`FTP_SERVER_DIR` je cielovy priecinok na hostingu, napriklad `/public_html`, `/www`, `/domains/tvoja-domena.sk/public_html` alebo hodnota, ktoru ukaze hosting.

## 3. Spustenie deployu

V GitHube otvor:

```text
Actions > Deploy Draciky website to FTP > Run workflow
```

Najprv skus:

```text
protocol: ftp
port: 21
log_level: standard
```

Ak hosting vyzaduje FTPS, pouzi `ftps` alebo `ftps-legacy` podla udajov z hostingu.

## 4. DNS domeny

V administracii domeny nastav DNS podla hostingu. Najcastejsie je to bud zmena nameserverov na nameservery hostingu, alebo A zaznam domeny na IP adresu servera.

Po zmene DNS moze propagacia trvat od niekolkych minut do 24 hodin.

