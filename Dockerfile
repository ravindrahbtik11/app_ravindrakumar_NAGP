


# Use Microsoft's official build .NET image.
# https://hub.docker.com/_/microsoft-dotnet-core-sdk/
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
RUN apk add --no-cache icu-libs
WORKDIR /app

EXPOSE 8080
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:8080


# Install production dependencies.
# Copy csproj and restore as distinct layers.
COPY "eCommerce.ProductService/*.csproj" "./"
RUN dotnet restore

# Copy local code to the container image.
COPY "./eCommerce.ProductService/"  ./
WORKDIR /app
# Build a release artifact.
RUN dotnet publish -c Release -o out

# Use Microsoft's official runtime .NET image.
# https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-amd64 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8
## Make sure the app binds to port 8080
#ENV  ASPNETCORE_URLS=http://+:8080
# Run the web service on container startup.
ENTRYPOINT ["dotnet", "eCommerce.ProductService.dll"]