# start:
run `npm start`. 

# objective
1. Przenieść starą dokumentację (obecnie trzymaną na dyskach w postaci .doc) do Confluence. Głównie w celu ułatwienia wyszukiwania informacji.
Dotyczy: 
- dokumentacja modułów PMFS (ok. 1000 plików)
- Analizy do zgłoszeń załączone do podtasków w JIRA

2. Zwiększyć czytelność wyszukiwania w Confluence. Tj. treść improtowanej dokumentacji powinna znajdować się bezpośrednio na stronach Confluence; Gdy jest tylko wrzucona jako załącznik do poszczególnych stron, nie działają wszystkie funkcjonalności wyszukiwania. (Konkretnie: nie działa opcja "wyszukuj tylko w podstronach strony X ").

   
#
# notes
## Co już jest:
Działa przenoszenie dokumentacji na zasadzie: 
- dla każdego pliku .doc w folderze
- ...załóż folder o takiej samej nazwie jak nazwa pliku (wraz z rozszerzeniem)
- i wrzuć do niego ten plik (.doc),
- i w content page`a wrzuć macro (view-word-macro) do wyświetlenia treści załączonego doc'a.


Przeniesienie tych folderów do Confluence (https://............../confluence/plugins/servlet/confluence/default - czyli via webDAV) jest równoznaczne z tworzeniem nowych stron.

### ACHTUNG / TODO:
- uwaga: przy przerzucaniu webDAV'em utworzonych plików istnieje kontrola zbublowanych nazw folderów, ale bez odpowiedniego komunikatu (Jest tylko "Nieoczekiwany błąd (...) System nie może uzyskać dostępu do pliku").
- Zaimplementowano dosyć ograniczoną kontrole błędów - jeśli tworzenie danego pliku/katalogu się nie powiedzie (try/catch) aplikacja się wysypie. Trzeba śledzić console.log`a - żeby sprawdzić, który plik zapisał się ostatnio.

#
## OLD-conception:
- Przerobienie nodem (JS) .doc`ów na html
- - jako automatyczny import plików
- - zamiast wrzucania wordowskiego załącznika i wrzucania makro do jego wyświetlania.
- - Patent niby mógłby działać, ale jest za dużo problemów : a to z tabelami, a to z załączonymi obrazkami/diagramami itd.

note:
-wg https://confluence.atlassian.com/doc/confluence-markup-283640216.html
syntax conf-page`ów to nie hmtl a xhtml.
Po co?
A bo nie działa zaawansowane wyszukiwanie. Tj. działa wyszukiwanie treści załączników, ale *nie gdy użyć opcji wyszukiwania stron "z [wskazanym] przodkiem"* - np. w celu zawężenia wyników.
Jest na to obejście. Można wyeksportować do pliku (np. pdf) daną stroną wraz z podstronami i w niej szukać danej frazy. Eksportowane bowiem są także załączniki, które były uchwycone makrem word-view-macro.

