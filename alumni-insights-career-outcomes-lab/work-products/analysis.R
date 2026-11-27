# Run from work-products directory; base R only.
# Synthetic data; illustrative and not a real impact estimate.
crm <- read.csv("crm.csv", stringsAsFactors=FALSE)
s <- read.csv("survey.csv", stringsAsFactors=FALSE)
c <- read.csv("career.csv", stringsAsFactors=FALSE)
for (k in c("invite","base")) crm[[k]] <- tolower(as.character(crm[[k]]))=="true"
for (k in c("employed","lead","service")) c[[k]] <- tolower(as.character(c[[k]]))=="true"
stopifnot(!anyDuplicated(crm$id), !anyDuplicated(paste(c$id,c$year)), !anyDuplicated(paste(s$id,s$year)))
for (y in 2024:2026) {
  o <- subset(c, year==y); r <- subset(s, year==y)
  print(data.frame(year=y,employment=mean(o$employed),followup=nrow(o)/nrow(crm),response=nrow(r)/nrow(crm)))
}
p <- merge(subset(c,year==2024),subset(c,year==2026),by="id",suffixes=c(".start",".end"))
print(table(p$employed.start,p$employed.end))
a <- merge(crm,subset(c,year==2026),by="id",all.x=TRUE)
b <- lapply(split(a,a$invite),function(g) {
  k <- sum(g$employed,na.rm=TRUE); missing <- sum(is.na(g$employed))
  c(lower=k/nrow(g),upper=(k+missing)/nrow(g))
})
print(c(lower=b[["TRUE"]][1]-b[["FALSE"]][2],upper=b[["TRUE"]][2]-b[["FALSE"]][1]))
z <- merge(crm,subset(s,year==2026),by="id",all.x=TRUE)
cells <- split(z,paste(z$region,z$cohort))
w <- lapply(cells,function(g) {r <- g[!is.na(g$aspiration),]; if(nrow(r)<5) return(NULL); data.frame(w=nrow(g)/nrow(r),event=r$aspiration=="Career transition")})
w <- do.call(rbind,w); print(weighted.mean(w$event,w$w));print(sum(w$w)^2/sum(w$w^2))
