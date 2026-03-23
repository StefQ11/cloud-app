# Cloud Task Manager - by Filip Stefaniak

Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.

## Deklaracja Architektury (Mapowanie Azure)
Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.

| Warstwa | Komponent Lokalny | Usługa Azure |
| :--- | :--- | :--- |
| **Presentation** | React 19 (Vite) | Azure Static Web Apps |
| **Application** | API (.NET 9 / Node 24) | Azure App Service |
| **Data** | SQL Server (Dev) | Azure SQL Database (Serverless) |

> **Notatka:** Aby poprawnie uruchomić aplikację poprzez VisualStudio niezbędne są aplikację takie jak: Node.js, .NET 9, Docker Desktop

## 🏗 Status Projektu i Dokumentacja
* [x] **Artefakt 1:** Zaplanowano strukturę folderów i diagram C4 (dostępny w `/docs`).
* [x] **Artefakt 2:** Środowisko wielokontenerowe uruchomione lokalnie.
* [x] **Artefakt 3:** Działająca warstwa prezentacji.
* [x] **Artefakt 4:** Działająca warstwa logiki backendu.
* [x] **Artefakt 5:** System gotowy na chmurę.
* [x] **Artefakt 6:** Aplikacja wdrożona w Azure.
> **Informacja:** Ten plik będzie ewoluował. W kolejnych etapach dodamy tutaj sekcje 'Quick Start', opis zmiennych środowiskowych oraz instrukcję wdrożenia (CI/CD).

## 🚀 Uruchamianie projektu

Projekt składa się z:
- 🔵 Frontend (React / Vite)
- 🟢 Backend (.NET API)

---

### 🔵 Frontend

```bash
cd frontend
npm install
npm run dev
```
**Build (do deployu):**
```bash
npm run build
```
➡️ gotowe pliki: dist/

### 🟢 Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```
**Build (do deployu):**
```bash
dotnet publish -c Release
```
➡️ gotowe pliki w folderze: bin/Release/.../publish/